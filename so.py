import asyncio
from bleak import BleakClient

BLE_ADDRESS = "C0:BB:CC:DD:EE:17"

# UUID сервиса и характеристики
SERVICE_UUID = "0000ff00-0000-1000-8000-00805f9b34fb"
CHARACTERISTIC_UUID = "0000ff02-0000-1000-8000-00805f9b34fb"

# 🔐 Здесь вставь свой токен (байтовая строка)
TOKEN = b"your_token_here"  # например: b"abc123def456"

async def send_token():
    async with BleakClient(BLE_ADDRESS) as client:
        if await client.is_connected():
            print("Устройство подключено")

            await client.write_gatt_char(CHARACTERISTIC_UUID, TOKEN)
            print(" Токен отправлен")

        else:
            print(" Не удалось подключиться")

asyncio.run(send_token())
