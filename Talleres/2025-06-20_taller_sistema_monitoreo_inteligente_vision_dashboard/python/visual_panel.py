import dash
from dash import html, dcc, dash_table
from dash.dependencies import Input, Output
import plotly.graph_objects as go
import cv2
import base64
import pandas as pd
import threading
import time

class VisualPanel:
    def __init__(self):
        self.app = dash.Dash(__name__)
        self.frame_global = None
        self.counters_global = {}
        self.system_status_global = "Activo"
        self.log_data_global = pd.DataFrame(columns=["timestamp", "evento", "clase", "confianza"])
        self.detection_history = pd.DataFrame(columns=["timestamp", "object", "count"])
        
        self.setup_layout()
        self.setup_callbacks()
        
    def setup_layout(self):
        self.app.layout = html.Div([
            html.H1("Sistema de Monitoreo Inteligente", style={'textAlign': 'center'}),
            
            html.Div([
                html.Div([
                    html.H2("Video en tiempo real"),
                    html.Img(id='live-video', src='', width="100%")
                ], className="six columns"),
                
                html.Div([
                    html.H2("Estadísticas del sistema"),
                    html.Div(id='system-status', style={
                        'fontSize': 24,
                        'padding': '10px',
                        'backgroundColor': '#f0f0f0',
                        'borderRadius': '5px',
                        'marginBottom': '20px'
                    }),
                    
                    html.Div([
                        html.Div([
                            html.H3("Distribución de objetos"),
                            dcc.Graph(id='object-distribution')
                        ], className="six columns"),
                        
                        html.Div([
                            html.H3("Conteo temporal"),
                            dcc.Graph(id='time-series')
                        ], className="six columns")
                    ], className="row"),
                    
                    html.Div([
                        html.H3("Eventos recientes"),
                        dash_table.DataTable(
                            id='log-table',
                            columns=[{"name": i, "id": i} for i in self.log_data_global.columns],
                            style_table={'overflowX': 'auto'},
                            style_cell={
                                'height': 'auto',
                                'minWidth': '100px', 'width': '150px', 'maxWidth': '180px',
                                'whiteSpace': 'normal'
                            },
                            page_size=5
                        )
                    ])
                ], className="six columns")
            ], className="row"),
            
            dcc.Interval(
                id='interval-component',
                interval=1000,  # Actualizar cada segundo
                n_intervals=0
            )
        ], style={'padding': '20px'})

    def setup_callbacks(self):
        @self.app.callback(
            [Output('live-video', 'src'),
             Output('system-status', 'children'),
             Output('object-distribution', 'figure'),
             Output('time-series', 'figure'),
             Output('log-table', 'data')],
            [Input('interval-component', 'n_intervals')]
        )
        def update_dashboard(n):
            # Obtener los datos actuales
            frame = self.frame_global
            counters = self.counters_global
            status = self.system_status_global
            logs = self.log_data_global.tail(5).to_dict('records')
            
            # Convertir frame a base64 para mostrarlo
            img_src = ''
            if frame is not None:
                _, buffer = cv2.imencode('.jpg', frame)
                img_src = 'data:image/jpeg;base64,{}'.format(base64.b64encode(buffer).decode())
            
            # Crear gráfico de distribución de objetos
            dist_fig = go.Figure()
            if counters:
                dist_fig.add_trace(go.Bar(
                    x=list(counters.keys()),
                    y=list(counters.values()),
                    marker_color='royalblue'
                ))
            dist_fig.update_layout(
                title="Conteo acumulado de objetos",
                xaxis_title="Objeto",
                yaxis_title="Cantidad"
            )
            
            # Crear gráfico de series de tiempo
            time_fig = go.Figure()
            if not self.detection_history.empty:
                for obj in self.detection_history['object'].unique():
                    obj_data = self.detection_history[self.detection_history['object'] == obj]
                    time_fig.add_trace(go.Scatter(
                        x=obj_data['timestamp'],
                        y=obj_data['count'],
                        mode='lines+markers',
                        name=obj
                    ))
            time_fig.update_layout(
                title="Detecciones en los últimos 60 segundos",
                xaxis_title="Tiempo",
                yaxis_title="Cantidad detectada"
            )
            
            # Estado del sistema con color
            status_color = 'green' if status == "Activo" else 'red'
            status_div = html.Span(f"Estado del sistema: {status}", style={'color': status_color})
            
            return img_src, status_div, dist_fig, time_fig, logs

    def update(self, detections):
        # Actualizar contadores
        current_counters = {}
        for detection in detections:
            obj_class = detection['class']
            current_counters[obj_class] = current_counters.get(obj_class, 0) + 1
        
        self.counters_global = current_counters
        
        # Actualizar historial de detecciones
        current_time = pd.Timestamp.now()
        for obj_class, count in current_counters.items():
            new_entry = pd.DataFrame({
                "timestamp": [current_time],
                "object": [obj_class],
                "count": [count]
            })
            self.detection_history = pd.concat([self.detection_history, new_entry])
        
        # Mantener solo los últimos 60 segundos
        self.detection_history = self.detection_history[
            self.detection_history['timestamp'] > (current_time - pd.Timedelta(seconds=60))
        ]

    def update_frame(self, frame):
        self.frame_global = frame

    def update_logs(self, log_entry):
        self.log_data_global = pd.concat([
            self.log_data_global,
            pd.DataFrame([log_entry])
        ], ignore_index=True)

    def run(self):
        # Iniciar el servidor Dash en un hilo separado
        threading.Thread(target=self.app.run, kwargs={
            'debug': False,
            'use_reloader': False
        }).start()
