import PropertyCard from "../PropertyCard";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { axiosPublic } from "../../hooks/useAxiosPublic";

const SearchFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [sortText, setSortText] = useState("");
  const [properties, setProperties] = useState([]);

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  // using useeffect because tanstack query is not working in search functionality. Note: suggested by instructor Ferdous Zihad bhai
  useEffect(() => {
    axiosPublic
      .get(
        `/properties?verification_status=verified&location=${searchText}&sort=${sortText}`
      )
      .then((data) => {
        setProperties(data.data);
      });
    console.log(sortText, searchText);
  }, [sortText, searchText]);
  return (
    <div>
      <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto my-3 md:my-5 lg:my-8 flex gap-2">
        <label className="input input-sm md:input-md input-bordered flex items-center gap-2 rounded-full">
          <input
            onChange={handleSearch}
            type="text"
            className="grow "
            placeholder="Enter location"
          />
          <span className="p-[6px] md:p-3 bg-[#E7C873] rounded-full -mr-2">
            <FaSearch />
          </span>
        </label>
        <select
          onChange={(e) => setSortText(e.target.value)}
          defaultValue="Sort by price"
          className="select select-sm md:select-md select-bordered w-full max-w-xs"
        >
          <option disabled value="Sort by price">
            Sort by price
          </option>
          <option value="max_price">Max price</option>
          <option>Min price</option>
        </select>
      </div>
      {/* showing all properties  */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
        {properties?.length > 0 ? (
          properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              agent={true}
            ></PropertyCard>
          ))
        ) : (
          <p>No match found</p>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
