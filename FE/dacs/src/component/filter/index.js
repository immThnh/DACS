// File: src/components/FilterComponent.jsx
import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import styles from './filterComponent.module.scss';

const FilterComponent = ({ options, handleSelectChange }) => {
    const [selectedCategory, setSelectedCategory] = useState(options[0]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        handleSelectChange(category);
    };

    return (
        <div className={styles.contentItem}>
            <label htmlFor="category-listbox">Category</label>
            <Listbox value={selectedCategory} onChange={handleCategoryChange}>
                <div className="relative mt-1">
                    <Listbox.Button className={clsx(styles.formSelect, "relative w-full py-2  text-left bg-gray-800 text-black rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-teal-300 focus-visible:ring-offset-2 sm:text-sm")}>
                        <span className="block truncate">{selectedCategory ? selectedCategory.name : "Select"}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                            <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    value={option}
                                    className={({ active }) =>
                                        clsx(
                                            'cursor-default select-none relative py-2 pl-10 pr-4',
                                            active ? 'text-white bg-gray-700' : 'text-gray-400'
                                        )
                                    }
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={clsx('block truncate', {
                                                    'font-medium': selected,
                                                    'font-normal': !selected,
                                                })}
                                            >
                                                {option.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={clsx(
                                                        'absolute inset-y-0  flex items-center ',
                                                        {
                                                            'text-white': active,
                                                            'text-gray-600': !active,
                                                        }
                                                    )}
                                                >
                                                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default FilterComponent;
