import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaFilm,
  FaStairs,
  FaLeaf,
  FaOm,
  FaBriefcase,
  FaHouseChimneyWindow,
} from "react-icons/fa6";

export const features = [
  {
    icon: FaBed,
    title: "4 Bedrooms",
    description:
      "Three bedrooms and master bedroom on the first floor—each with attached bathrooms and balconies.",
  },
  {
    icon: FaBath,
    title: "5 Bathrooms",
    description: "Attached bathrooms in all bedrooms and guest amenities.",
  },
  {
    icon: FaRulerCombined,
    title: "Spacious Layout",
    description: "Three floors from ground hall to terrace garden.",
  },
  {
    icon: FaFilm,
    title: "Mini Theatre",
    description: "Home theatre on the ground floor.",
  },
  {
    icon: FaStairs,
    title: "Floating Stairs",
    description: "Floating staircase connecting all three levels.",
  },
  {
    icon: FaLeaf,
    title: "Terrace Garden",
    description:
      "Terrace garden with gazebo and sunset viewpoint on the second floor.",
  },
  {
    icon: FaOm,
    title: "Pooja Room",
    description: "Prayer room on the first floor.",
  },
  {
    icon: FaBriefcase,
    title: "Home Office",
    description: "Home office on the ground floor.",
  },
  {
    icon: FaHouseChimneyWindow,
    title: "Gazebo",
    description:
      "Outdoor gazebo space on the second floor with terrace access.",
  },
];

export const stats = [
  { value: 4, suffix: " Bedrooms", key: "bedrooms" },
  { value: 2, suffix: " Guest Rooms", key: "guestRooms" },
  { value: 5, suffix: " Baths", key: "baths" },
  { value: 3, suffix: " Floors", key: "floors" },
];
