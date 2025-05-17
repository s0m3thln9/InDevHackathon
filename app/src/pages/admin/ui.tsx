import { useEffect, useState } from "react"
import {
  FaUserCog,
  FaChartLine,
  FaBed,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaUserShield,
} from "react-icons/fa"
import axios from "axios"
import log = require("eslint-plugin-react/lib/util/log")

export const AdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen)

  // Mock data
  const roomStats = [
    { type: "Свободные", count: 24, color: "bg-green-500" },
    { type: "Забронированные", count: 12, color: "bg-blue-500" },
    { type: "Занятые", count: 8, color: "bg-yellow-500" },
    { type: "На обслуживании", count: 3, color: "bg-red-500" },
  ]

  useEffect(() => {
    const request = async () => {
      return await axios.get("http://127.0.0.1:5000/api/admin/home")
    }
    request().then((r) => console.log(r))
  }, [])

  const upcomingBookings = [
    { id: 1, guest: "Иванов И.И.", room: "101", date: "15.05.2023" },
    { id: 2, guest: "Петров П.П.", room: "205", date: "16.05.2023" },
    { id: 3, guest: "Сидоров С.С.", room: "310", date: "17.05.2023" },
  ]

  const roomIssues = [
    { id: 1, room: "107", issue: "Протекает кран", status: "В работе" },
    { id: 2, room: "203", issue: "Сломан кондиционер", status: "Новая" },
  ]

  return (
    <div className="min-h-screen bg-[#111827] text-[#F9FAFB]">
      {/* Header */}
      <header className="bg-[#1F2937] shadow-sm border-b border-[#374151]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="mr-4 text-[#9CA3AF] hover:text-[#F9FAFB]"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-xl font-bold flex items-center">
              <FaHome className="mr-2 text-[#7C3AED]" /> Главная
            </h1>
          </div>

          <div className="relative">
            <button
              onClick={toggleUserDropdown}
              className="flex items-center hover:text-[#3B82F6]"
            >
              <FaUserShield className="mr-2 text-[#7C3AED]" />
              <span>Администратор</span>
              {isUserDropdownOpen ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1F2937] rounded-md shadow-lg py-1 z-10 border border-[#374151]">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-[#374151] hover:text-[#3B82F6]"
                >
                  Профиль
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-[#374151] hover:text-[#3B82F6]"
                >
                  Настройки
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-[#374151] hover:text-[#3B82F6]"
                >
                  Выйти
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-[#1F2937] shadow-lg border-r border-[#374151]">
            <div className="p-4 border-b border-[#374151]">
              <h2 className="text-lg font-semibold">Меню администратора</h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 hover:bg-[#374151] hover:text-[#3B82F6] rounded"
                  >
                    <FaUserCog className="mr-3 text-[#7C3AED]" /> Управление
                    пользователями
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 hover:bg-[#374151] hover:text-[#3B82F6] rounded"
                  >
                    <FaBed className="mr-3 text-[#7C3AED]" /> Управление
                    номерами
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 hover:bg-[#374151] hover:text-[#3B82F6] rounded"
                  >
                    <FaCalendarAlt className="mr-3 text-[#7C3AED]" />{" "}
                    Бронирования
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 hover:bg-[#374151] hover:text-[#3B82F6] rounded"
                  >
                    <FaChartLine className="mr-3 text-[#7C3AED]" /> Отчеты
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 hover:bg-[#374151] hover:text-[#3B82F6] rounded"
                  >
                    <FaExclamationTriangle className="mr-3 text-[#7C3AED]" />{" "}
                    Проблемы
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Room Statistics */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Статистика номеров</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roomStats.map((stat) => (
              <div
                key={stat.type}
                className="bg-[#1F2937] p-6 rounded-lg border border-[#374151]"
              >
                <div className="flex items-center">
                  <div
                    className={`${stat.color} w-4 h-4 rounded-full mr-3`}
                  ></div>
                  <h3 className="text-lg font-medium">{stat.type}</h3>
                </div>
                <p className="mt-2 text-3xl font-bold">{stat.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8 bg-[#1F2937] p-6 rounded-lg border border-[#374151]">
          <h2 className="text-lg font-medium mb-4">График загрузки номеров</h2>
          <div className="h-64 bg-[#111827] rounded flex items-center justify-center border border-[#374151]">
            <p className="text-[#9CA3AF]">Здесь будет график</p>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8 bg-[#1F2937] p-6 rounded-lg border border-[#374151]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Ближайшие бронирования</h2>
            <a href="#" className="text-sm text-[#3B82F6] hover:text-[#7C3AED]">
              Посмотреть все
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#374151]">
              <thead className="bg-[#111827]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Гость
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Номер
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Дата заезда
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#1F2937] divide-y divide-[#374151]">
                {upcomingBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {booking.guest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9CA3AF]">
                      {booking.room}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9CA3AF]">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9CA3AF]">
                      <a
                        href="#"
                        className="text-[#3B82F6] hover:text-[#7C3AED] mr-3"
                      >
                        Подробнее
                      </a>
                      <a
                        href="#"
                        className="text-[#EF4444] hover:text-[#F87171]"
                      >
                        Отменить
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Room Issues */}
        <div className="mb-8 bg-[#1F2937] p-6 rounded-lg border border-[#374151]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Проблемы в номерах</h2>
            <a href="#" className="text-sm text-[#3B82F6] hover:text-[#7C3AED]">
              Посмотреть все
            </a>
          </div>
          <div className="space-y-4">
            {roomIssues.map((issue) => (
              <div
                key={issue.id}
                className="border-l-4 border-[#7C3AED] pl-4 py-2 bg-[#111827] rounded-r"
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">
                    Номер {issue.room}: {issue.issue}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      issue.status === "Новая"
                        ? "bg-red-900 text-red-100"
                        : "bg-yellow-900 text-yellow-100"
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
                <p className="text-sm text-[#9CA3AF] mt-1">
                  Заявка создана сегодня
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Actions */}
        <div className="bg-[#1F2937] p-6 rounded-lg border border-[#374151]">
          <h2 className="text-lg font-medium mb-4">
            Административные действия
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 px-4 rounded flex items-center justify-center transition-colors">
              <FaUserCog className="mr-2" /> Задать роль пользователю
            </button>
            <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 px-4 rounded flex items-center justify-center transition-colors">
              <FaBed className="mr-2" /> Добавить новый номер
            </button>
            <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 px-4 rounded flex items-center justify-center transition-colors">
              <FaCalendarAlt className="mr-2" /> Создать специальное предложение
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
