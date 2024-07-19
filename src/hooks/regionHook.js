import { useContext } from "react";
import { RegionContext } from "../context/RegionContext";
import axios from "axios";

const useRegionState = () => {
  const { setRegion } = useContext(RegionContext);

  const apiKey = process.env.REACT_APP_GEO_KEY;

  const getRegion = async () => {
    await axios
      .get(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`)
      .then((res) => {
        setRegion(res.data.location.country);
      });
  };
  return {
    getRegion,
  };
};
export default useRegionState;
