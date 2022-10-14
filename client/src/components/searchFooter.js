import React, { useState } from 'react'; 


function SearchFooter() {
    const getInitialState = () => {
        const value = "allTags";
        return value;
      };
    
      const [value, setValue] = useState(getInitialState);
    
      const handleChange = (e) => {
        setValue(e.target.value);
      };


        return (
            <footer id="searchFooter" className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white"> Search Bars go here</p>
                <div>
                    <form>
                        <select value={value} onChange={handleChange}>
                            <option value="allTags">All Tags</option>
                            <option value="animals">Animals</option>
                            <option value="beach">Beach</option>
                            <option value="bridge">Bridge</option>
                            <option value="building">Building</option>
                            <option value="canyon">Canyon</option>
                            <option value="city">City</option>
                            <option value="field">Field</option>
                            <option value="fog">Fog</option>
                            <option value="lake">Lake</option>
                            <option value="mountains">Mountains</option>
                            <option value="nature">Nature</option>
                            <option value="nature">Ocean</option>
                            <option value="river">River</option>
                            <option value="skyline">Skyline</option>
                            <option value="sunset">Sunset</option>
                            <option value="trees">Trees</option>
                            <option value="water">Water</option>
                            <option value="waterfall">Waterfall</option>
                        </select>
                        <input type="submit" value="Submit"></input>
                    </form>
                    <p>{`You selected ${value}`}</p>
                </div>
            </div>
        </footer>


)

    }



export default SearchFooter;