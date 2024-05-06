import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi } from "../constants/abi";
import { ContractAdress } from "../constants/smartContractAddress";
import { useState, useEffect } from "react";

export default function Home() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  const { data: data1, error: error1, runContractFunction: runstore, isFetching: isFetching1, isLoading: isLoading1 } =
    useWeb3Contract({
      abi: abi,
      contractAddress: ContractAdress, // your contract address here
      functionName: "store", // replace with the first function name
      params: {
        _favoriteNumber: 328,
      },
    });

  const { data: data2, error: error2, runContractFunction: runretrieve, isFetching: isFetching2, isLoading: isLoading2 } =
    useWeb3Contract({
      abi: abi,
      contractAddress: ContractAdress, // your contract address here
      functionName: "retrieve", // replace with the second function name
      params: {
        // provide parameters for the second function
      },

    });

  const { data: data3, error: error3, runContractFunction: runaddperson, isFetching: isFetching3, isLoading: isLoading3 } =
    useWeb3Contract({
      abi: abi,
      contractAddress: ContractAdress, // your contract address here
      functionName: "addPerson", // replace with the first function name
      params: {
        _name: "Fei Dumb",
        _favoriteNumber: 19,
      },
    });

  const { data: data4, error: error4, runContractFunction: runcheckperson, isFetching: isFetching4, isLoading: isLoading4 } =
    useWeb3Contract({
      abi: abi,
      contractAddress: ContractAdress, // your contract address here
      functionName: "checkPerson", // replace with the first function name
      params: {
        _name: "Fei Dumb",
      },
    });

  const { data: data5, error: error5, runContractFunction: runchecknumofperson, isFetching: isFetching5, isLoading: isLoading5 } =
    useWeb3Contract({
      abi: abi,
      contractAddress: ContractAdress, // your contract address here
      functionName: "checkNumOfPerson", // replace with the first function name
      params: {

      },
    });



  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  return (
    <div>

      {hasMetamask ? (
        isWeb3Enabled ? (
          "Connected! "
        ) : (
          <button onClick={() => enableWeb3()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}


      {isWeb3Enabled ? (
        <button
          onClick={() => {
            runstore();
            console.log("store");
          }}
        >
          Execute
        </button>
      ) : (
        ""
      )}

      {isWeb3Enabled ? (
        <button
          onClick={async () => {
            try {
              const result = (await runretrieve());
              const firstKey = Object.keys(result)[0];
              const firstElement = result[firstKey];

              const firstelementinteger = parseInt(firstElement);

              console.log("retrieve", firstelementinteger);


            } catch (error) {
              console.error("Error retrieving value:", error);
            }
          }}
        >
          Retrieve
        </button>
      ) : (
        ""
      )}

      {isWeb3Enabled ? (
        <button
          onClick={async () => {
            const result = (await runcheckperson());
            const firstKey = Object.keys(result)[0];
            const firstElement = result[firstKey];

            const firstelementinteger = parseInt(firstElement);

            console.log("checkperson", firstelementinteger);


          }}
        >
          CheckPerson
        </button>
      ) : (
        ""
      )}

      {isWeb3Enabled ? (
        <button
          onClick={() => {
            runaddperson();
            console.log("addperson");

          }}
        >
          addperson
        </button>
      ) : (
        ""
      )}
      {isWeb3Enabled ? (
        <button
          onClick={async () => {
            const result = (await runchecknumofperson());
            const firstKey = Object.keys(result)[0];
            const firstElement = result[firstKey];

            const firstelementinteger = parseInt(firstElement);
            console.log("num of person", firstelementinteger);

          }}
        >
          checkNumOfPerson
        </button>
      ) : (
        ""
      )}


    </div>
  );
}