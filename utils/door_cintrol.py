import socket
import controller_pb2 as api
import time

def safe_door_control(action):
    msg = api.ClientMessage()
    if action == "open":
        msg.set_state.state = api.States.DoorLockOpen
        print("Открываю дверь (8 сек)...")
    else:
        msg.set_state.state = api.States.DoorLockClose
        print("Закрываю дверь...")

    sock = None
    try:
        sock = socket.create_connection(('192.168.1.100', 7000), timeout=3)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

        sock.send(msg.SerializeToString())

        sock.settimeout(2)
        data = sock.recv(64)

        sock.close()
        sock = None

        response = api.ControllerResponse()
        response.ParseFromString(data)

        if not response.HasField('status') or response.status != api.Statuses.Ok:
            print("Ошибка выполнения команды!")
            return

        if action == "open":
            time.sleep(8)
            safe_door_control("close")

    except Exception as e:
        print(f"Ошибка: {e}")
    finally:
        if sock:
            try:
                sock.close()
            except:
                pass
        time.sleep(2)