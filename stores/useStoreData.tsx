import create, { SetState } from "zustand"
import axios from "axios"
import { IItem } from "../home/screens/Home"

type StoreData = {
  currentData: IItem[] | null
  setCurrentData: (data: IItem[]) => void
}

export const useStoreData = create((set: SetState<StoreData>) => ({
  currentData: null,
  setCurrentData: (data) => {
    set({ currentData: data })
  }
}))
