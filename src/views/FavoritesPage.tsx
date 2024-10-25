import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"
import { useMemo } from "react"

export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)
  const hasFavorite = useMemo(() => favorites.length, [favorites])

  return (
    <>
      {hasFavorite ? (
        <>
          <h1 className="text-5xl font-extrabold text-center">
            Recetas favoritas
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
            {favorites.map(drink => (
              <DrinkCard
                key={drink.idDrink}
                drink={drink}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="my-10 text-center text-4xl font-bold">
          No hay recetas favoritas agregadas
        </p>
      )}
    </>
  )
}
