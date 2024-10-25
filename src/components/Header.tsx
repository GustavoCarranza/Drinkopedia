import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {

    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const Categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)


    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Todo: validart
        if (Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        //Consultar las recetas
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row items-center">
                        <img
                            src="./icono.png"
                            alt=""
                            className="w-28"
                        />
                        <h1 className="text-7xl text-white font-bold tracking-widest">
                            <span className="text-yellow-500">Drink</span>opedia
                        </h1>
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold text-2xl' : 'text-white uppercase font-bold text-2xl'
                            }
                        >
                            Inicio
                        </NavLink>
                        <NavLink
                            to="/favoritos"
                            className={({ isActive }) =>
                                isActive ? 'text-orange-500 uppercase font-bold text-2xl' : 'text-white uppercase font-bold text-2xl'
                            }
                        >
                            Favoritos
                        </NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-yellow-500 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Nombre o ingredientes:
                            </label>
                            <input
                                type="text"
                                id="ingredient"
                                name="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Café"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Categoria:
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {Categories.drinks.map(category => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Buscar recetas"
                            className="cursor-pointer bg-gray-800 hover:bg-orange-900 text-white w-full p-2 rounded-lg text-xl uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
