import { useState } from "react"
import {
  FaUser,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaEdit,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaBed,
  FaStar,
  FaRegStar,
} from "react-icons/fa"

export const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("bookings")
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    password: "********",
  })

  const bookings = [
    {
      id: 1,
      room: "Стандарт",
      dateIn: "15.05.2023",
      dateOut: "18.05.2023",
      price: 10500,
      status: "Подтверждено",
      rating: 4,
    },
    {
      id: 2,
      room: "Делюкс",
      dateIn: "22.06.2023",
      dateOut: "25.06.2023",
      price: 16500,
      status: "Завершено",
      rating: null,
    },
    {
      id: 3,
      room: "Люкс",
      dateIn: "10.08.2023",
      dateOut: "15.08.2023",
      price: 42500,
      status: "Отменено",
      rating: null,
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSave = () => {
    setIsEditing(false)
    // Здесь будет логика сохранения данных
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />)
      }
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#F9FAFB]">
      {/* Header */}
      <header className="bg-[#1F2937] shadow-sm border-b border-[#374151]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold flex items-center">
              <FaUser className="mr-2 text-[#7C3AED]" /> Личный кабинет
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-[#1F2937] rounded-lg border border-[#374151] p-4 h-fit">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-[#374151] flex items-center justify-center mb-3">
                <FaUser size={40} className="text-[#9CA3AF]" />
              </div>
              <h2 className="text-lg font-semibold">{userData.name}</h2>
              <p className="text-sm text-[#9CA3AF]">{userData.email}</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === "bookings" ? "bg-[#7C3AED] text-white" : "hover:bg-[#374151]"}`}
              >
                <FaHistory className="mr-3" /> Мои бронирования
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === "profile" ? "bg-[#7C3AED] text-white" : "hover:bg-[#374151]"}`}
              >
                <FaUser className="mr-3" /> Профиль
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === "settings" ? "bg-[#7C3AED] text-white" : "hover:bg-[#374151]"}`}
              >
                <FaCog className="mr-3" /> Настройки
              </button>
              <button className="w-full flex items-center p-3 rounded-lg hover:bg-[#374151] text-red-400">
                <FaSignOutAlt className="mr-3" /> Выйти
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-[#1F2937] rounded-lg border border-[#374151] p-6">
            {activeTab === "bookings" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Мои бронирования</h2>

                {bookings.length === 0 ? (
                  <p className="text-[#9CA3AF]">У вас пока нет бронирований</p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-[#374151] rounded-lg p-4 hover:border-[#7C3AED] transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                          <div>
                            <h3 className="font-semibold flex items-center">
                              <FaBed className="mr-2 text-[#7C3AED]" />{" "}
                              {booking.room}
                            </h3>
                            <div className="flex items-center text-sm text-[#9CA3AF] mt-1">
                              <FaCalendarAlt className="mr-2" />
                              <span>
                                {booking.dateIn} - {booking.dateOut}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm mt-2 md:mt-0 ${
                              booking.status === "Подтверждено"
                                ? "bg-green-900 text-green-100"
                                : booking.status === "Завершено"
                                  ? "bg-blue-900 text-blue-100"
                                  : "bg-red-900 text-red-100"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-3 md:mb-0">
                            <p className="text-lg font-bold">
                              {booking.price} руб.
                            </p>
                            <p className="text-sm text-[#9CA3AF]">
                              Стоимость бронирования
                            </p>
                          </div>

                          {booking.status === "Завершено" &&
                            !booking.rating && (
                              <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 px-4 rounded transition-colors duration-200">
                                Оставить отзыв
                              </button>
                            )}

                          {booking.rating && (
                            <div className="flex items-center">
                              <span className="mr-2">Ваша оценка:</span>
                              <div className="flex">
                                {renderStars(booking.rating)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Профиль</h2>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 px-4 rounded transition-colors duration-200"
                      >
                        <FaCheck className="mr-2" /> Сохранить
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center border border-[#374151] hover:bg-[#374151] py-2 px-4 rounded transition-colors duration-200"
                      >
                        <FaTimes className="mr-2" /> Отмена
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 px-4 rounded transition-colors duration-200"
                    >
                      <FaEdit className="mr-2" /> Редактировать
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#9CA3AF] mb-2">
                      ФИО
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    ) : (
                      <p className="bg-[#111827] border border-[#374151] rounded-lg px-4 py-2">
                        {userData.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-[#9CA3AF] mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    ) : (
                      <p className="bg-[#111827] border border-[#374151] rounded-lg px-4 py-2">
                        {userData.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-[#9CA3AF] mb-2">
                      Телефон
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    ) : (
                      <p className="bg-[#111827] border border-[#374151] rounded-lg px-4 py-2">
                        {userData.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-[#9CA3AF] mb-2">
                      Пароль
                    </label>
                    {isEditing ? (
                      <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    ) : (
                      <p className="bg-[#111827] border border-[#374151] rounded-lg px-4 py-2">
                        {userData.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Настройки</h2>

                <div className="space-y-6">
                  <div className="border border-[#374151] rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Уведомления</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-[#374151] text-[#7C3AED] focus:ring-[#7C3AED]"
                        />
                        <span className="ml-2">Email-уведомления</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-[#374151] text-[#7C3AED] focus:ring-[#7C3AED]"
                        />
                        <span className="ml-2">SMS-уведомления</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-[#374151] text-[#7C3AED] focus:ring-[#7C3AED]"
                        />
                        <span className="ml-2">Push-уведомления</span>
                      </label>
                    </div>
                  </div>

                  <div className="border border-[#374151] rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Язык</h3>
                    <select className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]">
                      <option>Русский</option>
                      <option>English</option>
                    </select>
                  </div>

                  <div className="border border-[#374151] rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Тема</h3>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg hover:border-[#7C3AED]">
                        Темная
                      </button>
                      <button className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg hover:border-blue-500">
                        Светлая
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
