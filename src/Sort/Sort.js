export default function sortAddresses (addresses, sortBy="startDate") {
  if (sortBy === "workArea") {
    return addresses.sort((a, b) => a.workArea - b.workArea);
  } else if (sortBy === "inProgress") {
    return addresses.sort((a, b) => a.inProgress - b.inProgress);
  } else if (sortBy === "locationAddress") {
    return addresses.sort((a, b) => a.locationAddress - b.locationAddress);
  }
  return addresses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).reverse();
}