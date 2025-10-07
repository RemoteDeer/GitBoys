import asyncio
import logging

from aiogram import Bot, Dispatcher, types
from aiogram.filters.command import Command

# ВАЖНО! Вставьте сюда ваш токен, полученный от @BotFather
BOT_TOKEN = "НАПИШИ_СЮДА_СВОЙ_НОМЕР_КРАСАВЧИК"

# Включаем логирование, чтобы не пропустить важные сообщения
logging.basicConfig(level=logging.INFO)

# Объект бота
bot = Bot(token=BOT_TOKEN)
# Диспетчер
dp = Dispatcher()

# Хэндлер на команду /start
@dp.message(Command("begin"))
async def start(message: types.Message):
    await message.answer("Привет! Я эхо-бот. Отправь мне любое сообщение, и я его повторю.")


# Запуск процесса поллинга новых апдейтов
async def main():
    # Удаляем вебхук и пропускаем накопившиеся входящие сообщения
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
