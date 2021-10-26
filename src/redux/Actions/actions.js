import { ADD_Movie } from "../Constants/actions-types";

export const addMovie = newMovie => ({
    type:ADD_Movie,
    payload:newMovie
   });