import { useState } from "react"
import {
  FaSearch,
  FaBed,
  FaWifi,
  FaTv,
  FaCoffee,
  FaParking,
  FaSwimmingPool,
  FaUtensils,
  FaCalendarAlt,
  FaUser,
  FaStar,
  FaRegStar,
  FaFilter,
} from "react-icons/fa"

export const UserPage = () => {
  const [searchParams, setSearchParams] = useState({
    dateIn: "",
    dateOut: "",
    guests: 1,
  })
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    amenities: {
      wifi: false,
      tv: false,
      breakfast: false,
      parking: false,
      pool: false,
    },
  })

  const roomTypes = [
    {
      id: 1,
      name: "Стандарт",
      description:
        "Уютный номер с одной кроватью и всеми необходимыми удобствами",
      price: 3500,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      amenities: ["wifi", "tv", "coffee"],
      rating: 4.2,
    },
    {
      id: 2,
      name: "Делюкс",
      description: "Просторный номер с видом на город и улучшенным интерьером",
      price: 5500,
      capacity: 2,
      image: "https://images.unsplash.com/photo-1566669437685-b9e7952f5b84",
      amenities: ["wifi", "tv", "coffee", "parking"],
      rating: 4.7,
    },
    {
      id: 3,
      name: "Люкс",
      description: "Роскошный номер с гостиной зоной и панорамным видом",
      price: 8500,
      capacity: 3,
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b",
      amenities: ["wifi", "tv", "coffee", "parking", "pool", "breakfast"],
      rating: 4.9,
    },
    {
      id: 4,
      name: "Семейный",
      description:
        "Большой номер с двумя спальнями, идеально подходит для семей",
      price: 6500,
      capacity: 4,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      amenities: ["wifi", "tv", "coffee", "parking"],
      rating: 4.5,
    },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    // Здесь будет логика поиска
    console.log("Search params:", searchParams)
  }

  const handleBookNow = (room) => {
    setSelectedRoom(room)
  }

  const handleConfirmBooking = () => {
    alert(`Бронирование номера "${selectedRoom.name}" подтверждено!`)
    setSelectedRoom(null)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />)
      }
    }

    return stars
  }

  const renderAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <FaWifi className="text-[#3B82F6]" />
      case "tv":
        return <FaTv className="text-[#3B82F6]" />
      case "coffee":
        return <FaCoffee className="text-[#3B82F6]" />
      case "parking":
        return <FaParking className="text-[#3B82F6]" />
      case "pool":
        return <FaSwimmingPool className="text-[#3B82F6]" />
      case "breakfast":
        return <FaUtensils className="text-[#3B82F6]" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#F9FAFB]">
      {/* Header */}
      <header className="bg-[#1F2937] shadow-sm border-b border-[#374151]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold flex items-center">
              <FaBed className="mr-2 text-[#7C3AED]" /> Отель "Премиум"
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center hover:text-[#3B82F6]">
              <FaUser className="mr-1" /> Личный кабинет
            </button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-[#1F2937] border-b border-[#374151] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-sm text-[#9CA3AF] mb-1">
                Дата заезда
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-[#9CA3AF]" />
                <input
                  type="date"
                  value={searchParams.dateIn}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      dateIn: e.target.value,
                    })
                  }
                  className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#9CA3AF] mb-1">
                Дата выезда
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-[#9CA3AF]" />
                <input
                  type="date"
                  value={searchParams.dateOut}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      dateOut: e.target.value,
                    })
                  }
                  className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#9CA3AF] mb-1">Гости</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-[#9CA3AF]" />
                <select
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      guests: parseInt(e.target.value),
                    })
                  }
                  className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-3 py-2 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "гость" : "гостя"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <FaSearch className="inline mr-2" /> Найти номер
              </button>
            </div>
          </form>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-[#9CA3AF] hover:text-[#3B82F6] text-sm"
            >
              <FaFilter className="mr-1" /> Фильтры
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-[#111827] rounded-lg border border-[#374151]">
              <h3 className="font-medium mb-3">Фильтровать по:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#9CA3AF] mb-2">
                    Цена: до {filters.priceRange[1]} руб.
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="500"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [0, parseInt(e.target.value)],
                      })
                    }
                    className="w-full h-2 bg-[#374151] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-[#9CA3AF] mt-1">
                    <span>0 руб.</span>
                    <span>10 000 руб.</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#9CA3AF] mb-2">
                    Удобства:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(filters.amenities).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() =>
                            setFilters({
                              ...filters,
                              amenities: {
                                ...filters.amenities,
                                [key]: !value,
                              },
                            })
                          }
                          className="mr-2 rounded border-[#374151] text-[#7C3AED] focus:ring-[#7C3AED]"
                        />
                        <span className="text-sm">
                          {key === "wifi" && "Wi-Fi"}
                          {key === "tv" && "TV"}
                          {key === "breakfast" && "Завтрак"}
                          {key === "parking" && "Парковка"}
                          {key === "pool" && "Бассейн"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Доступные номера</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomTypes.map((room) => (
            <div
              key={room.id}
              className="bg-[#1F2937] rounded-lg overflow-hidden border border-[#374151] hover:border-[#7C3AED] transition-colors duration-200"
            >
              <div className="h-48 bg-gray-600 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  <div className="flex items-center">
                    {renderStars(room.rating)}
                    <span className="ml-1 text-sm text-[#9CA3AF]">
                      {room.rating}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#9CA3AF] mb-3">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center text-sm bg-[#111827] px-2 py-1 rounded"
                    >
                      {renderAmenityIcon(amenity)}
                      <span className="ml-1">
                        {amenity === "wifi" && "Wi-Fi"}
                        {amenity === "tv" && "TV"}
                        {amenity === "coffee" && "Кофе"}
                        {amenity === "parking" && "Парковка"}
                        {amenity === "pool" && "Бассейн"}
                        {amenity === "breakfast" && "Завтрак"}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold">
                      {room.price} руб.
                    </span>
                    <span className="text-sm text-[#9CA3AF] block">
                      за ночь
                    </span>
                  </div>
                  <button
                    onClick={() => handleBookNow(room)}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-2 px-4 rounded transition-colors duration-200"
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Booking Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1F2937] rounded-lg max-w-md w-full border border-[#374151]">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                Подтверждение бронирования
              </h3>

              <div className="mb-4">
                <h4 className="font-medium">{selectedRoom.name}</h4>
                <p className="text-sm text-[#9CA3AF]">
                  {selectedRoom.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-[#9CA3AF] mb-1">
                    Дата заезда
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-[#9CA3AF]" />
                    <input
                      type="date"
                      value={searchParams.dateIn}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          dateIn: e.target.value,
                        })
                      }
                      className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-3 py-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#9CA3AF] mb-1">
                    Дата выезда
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-[#9CA3AF]" />
                    <input
                      type="date"
                      value={searchParams.dateOut}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          dateOut: e.target.value,
                        })
                      }
                      className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-3 py-2"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-[#9CA3AF] mb-1">
                  Гости
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-[#9CA3AF]" />
                  <select
                    value={searchParams.guests}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        guests: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-[#111827] border border-[#374151] rounded-lg pl-10 pr-3 py-2"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "гость" : "гостя"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-[#374151] pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[#9CA3AF]">
                    {selectedRoom.price} руб. x 3 ночи
                  </span>
                  <span>10 500 руб.</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого</span>
                  <span>10 500 руб.</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="px-4 py-2 border border-[#374151] rounded-lg hover:bg-[#374151] transition-colors duration-200"
                >
                  Отмена
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg transition-colors duration-200"
                >
                  Подтвердить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
