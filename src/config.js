export default {
  colors: {
    default: '#344675',
    primary: '#42b883',
    //info: '#1d8cf8',
    info: '#75b3e1',
    danger: '#fd5d93',
    orange: '#ff8a76',
    teal: '#00d6b4',
    primaryGradient: [
      'rgba(76, 211, 150, 0.1)',
      'rgba(53, 183, 125, 0)',
      'rgba(119,52,169,0)'
    ],
    purpleGradient: ['rgba(253,93,147,0.8)', 'rgba(253,93,147,0)']
  },

  // global app config object
  config: JSON.stringify({
      apiUrl: 'http://localhost:4000',
      mockOn: true,
  })
  
};
