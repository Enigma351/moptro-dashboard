
export const overview = async (req, res) => {
  res.json({
    battery: 68,
    chargingStatus: 'Charging',
    chargingTime: '0h 58 min',
    batteryHealth: 76,
    efficiency: 20,
    consumption: 163,
    distance: 1342,
  });
};


export const utilization = async (req, res) => {
  res.json({
    change: 23,
    chart: [60, 45, 30, 55, 80, 70, 40],
    stats: [
      { label: 'Wallet', value: '$32,984' },
      { label: 'Average Range', value: '35 Km' },
      { label: 'Consumables Cost', value: '$2,400' },
      { label: 'Maintenance Cost', value: '$5,000' },
    ],
  });
};


export const products = (req, res) => {
  res.json([
    {
      id: 1,
      name: 'WASP',
      description: 'High performance EV',
      image: 'http://localhost:5000/uploads/products/B 1@2x.png',
    },
    {
      id: 2,
      name: 'SNAIL',
      description: 'Urban electric vehicle',
      image: 'http://localhost:5000/uploads/products/SNAIL 1.png',
    },
    {
      id: 3,
      name: 'BOLT',
      description: 'Fast charging EV',
      image: 'http://localhost:5000/uploads/products/B 1.png',
    },
  ]);
};

let settingsStore = [
  {
    key: 'email_follow',
    label: 'Email me when someone follows me',
    enabled: true,
  },
  {
    key: 'email_answer',
    label: 'Email me when someone answers',
    enabled: false,
  },
  {
    key: 'newsletter',
    label: 'Subscribe to newsletter',
    enabled: true,
  },
];

export const settings = async (req, res) => {
  res.json(settingsStore);
};

export const updateSettings = async (req, res) => {
  const { key } = req.body;

  const index = settingsStore.findIndex(
    (s) => s.key === key
  );

  if (index === -1) {
    return res
      .status(400)
      .json({ message: 'Invalid setting key' });
  }

 
  settingsStore[index].enabled =
    !settingsStore[index].enabled;

  res.json(settingsStore);
};
