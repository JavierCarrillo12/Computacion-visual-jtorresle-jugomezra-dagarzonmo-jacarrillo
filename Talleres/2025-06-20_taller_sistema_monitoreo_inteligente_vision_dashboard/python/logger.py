import pandas as pd

class Logger:
    def __init__(self):
        self.logs_df = pd.DataFrame(columns=["timestamp", "evento", "clase", "confianza"])

    def log_event(self, timestamp, evento, cls, confidence):
        log_entry = {
            "timestamp": timestamp,
            "evento": evento,
            "clase": cls,
            "confianza": confidence
        }
        self.logs_df = self.logs_df.append(log_entry, ignore_index=True)

    def save_logs(self, file_path="2025-06-20_taller_sistema_monitoreo_inteligente_vision_dashboard/logs/eventos.csv"):
        self.logs_df.to_csv(file_path, index=False)
