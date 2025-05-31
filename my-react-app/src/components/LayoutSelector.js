import layouts from '../layouts/layouts';

const LayoutSelector = ({ onSelect }) => {
  return (
    <div>
      <h3>Välj layout</h3>
      {layouts.map((layout) => (
        <button key={layout.id} onClick={() => onSelect(layout)}>
          {layout.name}
        </button>
      ))}
    </div>
  );
};

export default LayoutSelector;
