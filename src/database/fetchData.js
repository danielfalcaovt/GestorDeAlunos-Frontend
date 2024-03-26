import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext";

export default async function fetchData() {
  try {
    const {data, setData} = useContext(DataContext);

  } catch (error) {
    console.error(error);
    return false;
  }
};
