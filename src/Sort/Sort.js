export const sortAddresses = (addresses, key, sortConfig) => {
	let direction = "ascending";
	if (sortConfig.key === key && sortConfig.direction === "ascending") {
		direction = "descending";
	}

	const sortData = addresses.sort((a, b) => {
		if (key === "startDate") {
			return direction === "ascending"
				? new Date(a.startDate) - new Date(b.startDate)
				: new Date(b.startDate) - new Date(a.startDate);
		} else if (key === "workArea") {
			return direction === "ascending"
				? a.workArea - b.workArea
				: b.workArea - a.workArea;
		} else if (key === "inProgress") {
			return direction === "ascending"
				? a.inProgress - b.inProgress
				: b.inProgress - a.inProgress;
		} else if (key === "locationAddress") {
			return direction === "ascending"
				? a.locationAddress.localeCompare(b.locationAddress)
				: b.locationAddress.localeCompare(a.locationAddress);
		}

	});

	return {sortData, newSortConfig: {key, direction}};
}
