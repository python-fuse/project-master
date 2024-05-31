"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { Account, ID } from "appwrite";
import client from "./appwrite";

const account = new Account(client);

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (email, password, next, err) => {
    try {
      setLoading(true);
      const promise = await account.create(ID.unique(), email, password);
      console.log(promise);
      setUser(promise);
      setLoading(false);
      next();
    } catch (e) {
      console.log(e);
      setError(e);
      setLoading(false);
      err();
    }
  };

  const logIn = async (email, password, next, err) => {
    try {
      setLoading(true);
      const promise = await account.createEmailPasswordSession(email, password);
      console.log(promise);
      setUser(promise);
      next();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setLoading(false);
      err();
    }
  };

  const logOut = async (next) => {
    try {
      setLoading(true);
      await account.deleteSession("current");
      setUser(null);
      next();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError(e);
    }
  };

  useEffect(() => {
    // Optionally, you can add logic here to check if the user is already logged in
    const getCurrentUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    };
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, signUp, logIn, logOut, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
