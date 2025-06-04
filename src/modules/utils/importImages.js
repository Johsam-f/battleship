function importAll(r) {
    const images = {};
    r.keys().forEach((key) => {
      const fileName = key.replace('./', '');
      images[fileName] = r(key);
    });
    return images;
  }
  
  const shipImages = importAll(require.context('../../assets', false, /\.(png|jpe?g|svg)$/));
  export default shipImages;
  