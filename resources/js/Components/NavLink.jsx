import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-gray-900  dark:text-gray-100'
                    : 'border-transparent text-gray-500 hover:text-gray-700  dark:text-gray-400  dark:hover:text-gray-300 dark:focus:text-gray-300') +
                className
            }
        >
            {children}
        </Link>
    );
}
