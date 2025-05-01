export const getHotChart = async (req, res) => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Failed to fetch chart data" });
  }
};
