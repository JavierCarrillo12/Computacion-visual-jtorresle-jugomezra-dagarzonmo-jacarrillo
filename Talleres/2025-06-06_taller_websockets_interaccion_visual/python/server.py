import asyncio
import websockets
import json

# Estado compartido
last_data = {
    "x": 0,
    "y": 0,
    "color": "blue"
}

connected = set()

async def handler(websocket):
    print("Cliente conectado")
    connected.add(websocket)
    try:
        async for message in websocket:
            try:
                incoming = json.loads(message)
                if "x" in incoming and "y" in incoming and "color" in incoming:
                    last_data.update(incoming)
                    print("Nuevo control:", last_data)
                # Reenviar el estado a todos los clientes
                await asyncio.gather(*[
                    conn.send(json.dumps(last_data))
                    for conn in connected
                    if conn.open
                ])
            except json.JSONDecodeError:
                print("Mensaje no es JSON válido")
    finally:
        connected.remove(websocket)
        print("Cliente desconectado")

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        await asyncio.Future()

asyncio.run(main())
