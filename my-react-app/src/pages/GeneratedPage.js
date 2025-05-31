const GeneratedPage = () => {
    const savedLayout = localStorage.getItem('generatedPage');
    const layout = savedLayout ? JSON.parse(savedLayout) : null;
  
    if (!layout) {
      return <p>Ingen sida har skapats än.</p>;
    }
  
    return (
      <div style={{ padding: '1rem' }}>
        <h2>{layout.name}</h2>
        <div>
          {layout.structure.map((item, index) => {
            if (item.type === 'image') {
              return (
                <img
                  key={index}
                  src={item.value || 'https://via.placeholder.com/300x200'}
                  alt="bild"
                  style={{ display: 'block'}}
                />
              );
            } else if (item.type === 'text') {
              return (
                <p key={index}>
                  {item.value || 'Exempeltext'}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  };
  
  export default GeneratedPage;
  