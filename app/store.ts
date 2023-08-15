import { create } from "zustand"

interface Customer {
 id: string;
 name: string;
 email: string;
 phoneNumber: string;
}

interface Store {
 customers: Customer[];
 addCustomer: (data: Customer) => void;
 updateCustomer: (id: string, data: Partial<Customer>) => void;
 deleteCustomer: (id: string) => void;
 importFromSession: (data: Customer[]) => void
}


const useStore = create<Store>((set) => ({
 customers: [],

 addCustomer: (data) => set((state) => ({ customers: [...state.customers, data as Customer] })),

 updateCustomer: (id, data) => set((state) => ({
  customers: state.customers.map(((customer) => {
   if (customer.id === id) {
    return {
     ...customer,
     ...data
    }
   } else {
    return customer
   }
  }))
 })),

 deleteCustomer: (id) => set((state) => ({
  customers: state.customers.filter((customer) => customer.id !== id)
 })),

 importFromSession: (data) => set((state) => ({
  customers: [...data]
 }))
}))

useStore.subscribe(
 (state) => {
  sessionStorage.setItem("storeData", JSON.stringify(state.customers))
 }
)

export default useStore