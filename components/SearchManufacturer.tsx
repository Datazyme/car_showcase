"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers = //if query is equal to an empty string show all manufacturers
    query === ""
      ? manufacturers
      : manufacturers.filter(
          (
            item //if not empty then filter the manufacturers list
          ) =>
            item
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) //checks if manufacturer includes the query
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full ">
          {/* Button for the combobox. Click on the icon to see the complete dropdown */}
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car Logo"
            />
          </Combobox.Button>

          {/* Input field for searching */}
          <Combobox.Input
            className="search-manufacturer__input"
            displayValue={(item: string) => item} //gets value then displays value
            onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
            placeholder="Volkswagen..."
          />

          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")} // Reset the search query after the transition completes
          >
            <Combobox.Options
              className="absolute mt-1 opacity-100 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              static
            >
              {filteredManufacturers.length === 0 && query !== "" ? ( //checks if query is empty
                <Combobox.Option
                  value={query}
                  className="search-manufacturer__option"
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredManufacturers.map(
                  (
                    item //take each item and call combobox option on each
                  ) => (
                    <Combobox.Option //styles highlited options different from non active
                      key={item}
                      className={({ active }) =>
                        `relative search-manufacturer__option ${
                          active
                            ? "bg-primary-blue text-white"
                            : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {(
                        { selected, active } //destructures selected and active to know which one is selected
                      ) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item}
                          </span>

                          {/* Show an active blue background color if the option is selected */}
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active
                                  ? "text-white"
                                  : "text-pribg-primary-purple"
                              }`}
                            ></span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  )
                )
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
