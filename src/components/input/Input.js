// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Input.css";

// export const Input = () => {
//   const navigate = useNavigate();
//   const [comicTexts, setComicTexts] = useState(Array(10).fill(''));

//   const handleChange = (index, value) => {
//     const newComicTexts = [...comicTexts];
//     newComicTexts[index] = value;
//     setComicTexts(newComicTexts);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {

//       const imagePromises = comicTexts.map(async (text) => {
//         const response = await query({ "inputs": text });
//         return URL.createObjectURL(response);
//       });

//       const generatedImages = await Promise.all(imagePromises);

//       // Navigate to the new page with the images
//       navigate('/images', { state: { images: generatedImages } });
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   async function query(data) {
//     console.log("Query function called");
//     const response = await fetch(
//       "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
//       {
//         headers: {
//           "Accept": "image/png",
//           "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
//           "Content-Type": "application/json"
//         },
//         method: "POST",
//         body: JSON.stringify(data),
//       }
//     );
//     const result = await response.blob();
//     return result;
//   }

//   return (
//     <div className="container mt-3 minH">
//       <form onSubmit={handleSubmit}>
//         {comicTexts.map((text, index) => (
//           <div key={index} className="mb-3">
//             <label htmlFor={`comic${index}`} className="form-label">{`Comic Panel ${index + 1}`}</label>
//             <input
//               type="text"
//               className="form-control"
//               id={`comic${index}`}
//               autoComplete='off'
//               value={text}
//               onChange={(e) => handleChange(index, e.target.value)}
//             />
//           </div>
//         ))}
//         <button type="submit" className="btn btn-primary">Get Images</button>
//       </form>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Input.css";

export const Input = () => {
  const navigate = useNavigate();
  const [comicTexts, setComicTexts] = useState(Array(10).fill(''));
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    const newComicTexts = [...comicTexts];
    newComicTexts[index] = value;
    setComicTexts(newComicTexts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError(null);

      const imagePromises = comicTexts.map(async (text) => {
        const response = await query({ "inputs": text });
        return URL.createObjectURL(response);
      });

      const generatedImages = await Promise.all(imagePromises);

      // Navigate to the new page with the images
      navigate('/images', { state: { images: generatedImages } });
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error fetching images. Please try again.");
    }
  };

  async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  return (
    <div className="container mt-3 minH">
      <form onSubmit={handleSubmit}>
        {comicTexts.map((text, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`comic${index}`} className="form-label">{`Comic Panel ${index + 1}`}</label>
            <input
              type="text"
              className="form-control"
              id={`comic${index}`}
              autoComplete='off'
              value={text}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Get Images</button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};
