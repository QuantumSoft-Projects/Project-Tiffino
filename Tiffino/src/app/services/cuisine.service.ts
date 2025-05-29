import { Injectable } from '@angular/core';
 
export interface Region {
  name: string;
  states: State[];
}
 
export interface State {
  name: string;
  dishes: string[];
}
 
@Injectable({
  providedIn: 'root'
})
export class CuisineService {
  private regions: Region[] = [
    {
      name: 'Northern India',
      states: [
        {
          name: 'Jammu & Kashmir',
          dishes: ['Rogan Josh', 'Yakhni', 'Dum Aloo', 'Modur Pulao', 'Kashmiri Kahwa']
        },
        {
          name: 'Punjab',
          dishes: ['Sarson ka Saag', 'Makki di Roti', 'Butter Chicken', 'Amritsari Kulcha', 'Lassi']
        },
        {
          name: 'Haryana',
          dishes: ['Kachri ki Sabzi', 'Besan Masala Roti', 'Mithe Chawal', 'Bajra Khichdi']
        },
        {
          name: 'Delhi',
          dishes: ['Chole Bhature', 'Butter Chicken', 'Parathas', 'Nihari', 'Aloo Tikki']
        },
        {
          name: 'Uttar Pradesh',
          dishes: ['Kachori', 'Petha', 'Lucknawi Biryani', 'Tundey kebab', 'Galouti Kebab']
        }
      ]
    },
    {
      name: 'Southern India',
      states: [
        {
          name: 'Kerala',
          dishes: ['Appam', 'Puttu', 'Sambar', 'Malabar Parotta', 'Fish Moilee']
        },
        {
          name: 'Tamil Nadu',
          dishes: ['Idli', 'Dosa', 'Sambar', 'Pongal', 'Chettinad Chicken']
        },
        {
          name: 'Karnataka',
          dishes: ['Bisi Bele Bath', 'Mysore Pak', 'Ragi Mudde', 'Neer Dosa']
        },
        {
          name: 'Andhra Pradesh',
          dishes: ['Hyderabadi Biryani', 'Gongura Pachadi', 'Pesarattu', 'Pulihora']
        }
      ]
    },
    {
      name: 'Eastern India',
      states: [
        {
          name: 'West Bengal',
          dishes: ['Shorshe Ilish', 'Kosha Mangsho', 'Sandesh', 'Rasgulla', 'Mishti Doi']
        },
        {
          name: 'Odisha',
          dishes: ['Pakhala Bhata', 'Dalma', 'Chhena Poda', 'Rasabali', 'Poda Pitha']
        },
        {
          name: 'Bihar',
          dishes: ['Litti Chokha', 'Sattu Paratha', 'Thekua', 'Dal Pitha']
        }
      ]
    },
    {
      name: 'Western India',
      states: [
        {
          name: 'Gujarat',
          dishes: ['Dhokla', 'Thepla', 'Khandvi', 'Undhiyu', 'Fafda-Jalebi']
        },
        {
          name: 'Maharashtra',
          dishes: ['Pav Bhaji', 'Puran Poli', 'Vada Pav', 'Misal Pav', 'Modak']
        },
        {
          name: 'Goa',
          dishes: ['Goan Fish Curry', 'Vindaloo', 'Bebinca', 'Sorpotel', 'Prawn Balchao']
        }
      ]
    },
    {
      name: 'North Eastern India',
      states: [
        {
          name: 'Assam',
          dishes: ['Assam Laksa', 'Duck Curry', 'Pitha', 'Masor Tenga']
        },
        {
          name: 'Manipur',
          dishes: ['Eromba', 'Chamthong', 'Singju', 'Kangshoi']
        },
        {
          name: 'Nagaland',
          dishes: ['Smoked Pork', 'Bamboo Steamed Fish', 'Axone', 'Zutho']
        }
      ]
    }
  ];
 
  getAllRegions(): Region[] {
    return this.regions;
  }
 
  getAllStates(): State[] {
    return this.regions.flatMap(region => region.states);
  }
 
  getAllDishes(): string[] {
    return this.regions
      .flatMap(region => region.states)
      .flatMap(state => state.dishes)
      .filter((dish, index, self) => self.indexOf(dish) === index)
      .sort();
  }
 
  getDishesByState(stateName: string): string[] {
    const state = this.regions
      .flatMap(region => region.states)
      .find(state => state.name === stateName);
    return state?.dishes || [];
  }
 
  getDishesByRegion(regionName: string): string[] {
    const region = this.regions.find(r => r.name === regionName);
    return region?.states.flatMap(state => state.dishes) || [];
  }
}