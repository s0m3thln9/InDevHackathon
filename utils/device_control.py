import socket
import controller_pb2 as api

def send_device_command(device_type, action):
    msg = api.ClientMessage()

    if device_type == 'light':
        msg.set_state.state = api.States.LightOn if action == 'on' else api.States.LightOff
    elif device_type == 'door_lock':
        msg.set_state.state = api.States.DoorLockOpen if action == 'open' else api.States.DoorLockClose
    elif device_type == 'channel_1':
        msg.set_state.state = api.States.Channel1On if action == 'on' else api.States.Channel1Off
    elif device_type == 'channel_2':
        msg.set_state.state = api.States.Channel2On if action == 'on' else api.States.Channel2Off
    else:
        raise ValueError("Неизвестный тип устройства")

    try:
        sock = socket.create_connection(('192.168.1.100', 7000), timeout=3)
        sock.send(msg.SerializeToString())
        response_data = sock.recv(64)
        sock.close()

        response = api.ControllerResponse()
        response.ParseFromString(response_data)

        if response.HasField("status") and response.status == api.Statuses.Ok:
            return True
        return False
    except Exception as e:
        print(f"Ошибка при отправке команды: {e}")
        return False