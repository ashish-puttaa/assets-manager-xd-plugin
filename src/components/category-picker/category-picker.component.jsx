const React = require('react');

const useWatchValue = require('../../hooks/useWatchValue.js');

const AddCategoryButton = require('../add-category-modal/add-category-modal.component.jsx');

require('./category-picker.styles.css');

function CategoryPicker({ title, values = [], onChange }) {
   const [categories, setCategories] = React.useState([]);
   const [selected, setSelected] = React.useState('');

   React.useEffect(() => {
      setCategories(values);
      const selectedValue = values.length > 0 ? values[0] : '';
      onCategoryChange(selectedValue);
   }, [values]);

   React.useEffect(() => {}, [values]);

   useWatchValue(values, `${title} value`);

   const onCategoryChange = (value) => {
      setSelected(value);
      onChange(value);
   };

   const handleCreateCategory = (newCategory) => {
      setCategories((prevState) => [...prevState, newCategory]);
      setSelected(newCategory);
   };

   return (
      <div className="cp-wrapper">
         <div className="cp-header">
            <label>
               <span>{title} : </span>
            </label>
            {
               <div className="cp-btn">
                  <AddCategoryButton
                     modalTitle={title}
                     handleCreateCategory={handleCreateCategory}
                  />
               </div>
            }
         </div>

         {categories.length ? (
            <select onChange={(e) => onCategoryChange(e.target.value)} value={selected}>
               {categories.map((item, i) => (
                  <option key={`${item}-${i}`} value={item}>
                     {item}
                  </option>
               ))}
            </select>
         ) : (
            <select value="novalue" disabled>
               <option value="novalue">No categories found.</option>
            </select>
         )}

         {selected && (
            <h3>
               Selected {title}: {selected}
            </h3>
         )}
      </div>
   );
}

module.exports = CategoryPicker;
