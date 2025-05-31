import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutSelector from '../components/LayoutSelector';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSelect = (layout) => {
    setSelectedLayout(layout);
    const initialContent = layout.structure.map((item) => ({
      type: item.type,
      value: '',
      file: null,
    }));
    setContent(initialContent);
  };

  const handleChange = (index, valueOrFile, isFile = false) => {
    const updated = [...content];
    if (isFile) {
      updated[index].file = valueOrFile;
    } else {
      updated[index].value = valueOrFile;
    }
    setContent(updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...content];
    updated[index].file = file;
    setContent(updated);
  };

  const createPage = async () => {
    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    const processedStructure = await Promise.all(
      content.map(async (item) => {
        if (item.type === 'image' && item.file) {
          const base64 = await convertToBase64(item.file);
          return { ...item, value: base64 };
        }
        return item;
      })
    );

    const finalPage = {
      ...selectedLayout,
      structure: processedStructure,
    };

    localStorage.setItem('generatedPage', JSON.stringify(finalPage));
    navigate('/custom-page');
  };

  const renderTextInput = (index, value) => (
    <textarea
      placeholder="Skriv text här..."
      value={value}
      onChange={(e) => handleChange(index, e.target.value)}
    />
  );

  const renderImageInput = (index, value, file) => (
    <div className="bild-input-row">
      <input
        type="text"
        placeholder="Bildlänk här..."
        value={value}
        onChange={(e) => handleChange(index, e.target.value)}
      />
      <label className="bild-fil-label">
        Välj fil
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(index, e.target.files[0])}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );

  const renderImagePreview = (value, file) => {
    const src = file ? URL.createObjectURL(file) : value;
    return src ? (
      <img
        src={src}
        alt="Förhandsvisning"
        className="bild-preview"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    ) : null;
  };

  const renderContentInputs = () => (
    content.map((item, index) => (
      <div key={index} className="content-input-row">
        {item.type === 'text' && renderTextInput(index, item.value)}
        {item.type === 'image' && (
          <>
            {renderImageInput(index, item.value, item.file)}
            {renderImagePreview(item.value, item.file)}
          </>
        )}
      </div>
    ))
  );

  return (
    <div className='hem-texter'>
      <h2>Adminpanel</h2>
      <LayoutSelector onSelect={handleSelect} />
      {selectedLayout && (
        <div>
          <h4>Fyll i rutorna för att skapa din hemsida</h4>
          {renderContentInputs()}
          <button onClick={createPage}>Skapa sida</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
