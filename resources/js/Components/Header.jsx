import React from 'react';
import { Link, usePage } from '@inertiajs/react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';


export default function Header() {
    const user = usePage().props.auth.user;

    return (
        <header className="bg-[#111827]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </Link>
                        </div>

                    </div>

                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                        <NavLink
                            href="/"
                        >
                            Browse flights
                        </NavLink>

                        <NavLink
                            href={route('bookings')}
                        >
                            Bookings
                        </NavLink>
                    </div>

                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
                        <div className="relative ms-3">

                            {user ? (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent  px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none  dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            ) :
                            <>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <svg className="cursor-pointer" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 17C6 17.93 6 18.395 6.10222 18.7765C6.37962 19.8117 7.18827 20.6204 8.22354 20.8978C8.60504 21 9.07003 21 10 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H10C9.07003 3 8.60504 3 8.22354 3.10222C7.18827 3.37962 6.37962 4.18827 6.10222 5.22354C6 5.60504 6 6.07003 6 7M12 8L16 12M16 12L12 16M16 12H3" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('login')}
                                        >
                                            Login
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('register')}
                                        >
                                            Register
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}