import { useState, useParams } from 'react'

export default function EditSong() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [is_requestable, setIsRequestable] = useState('');
    const [categories, setCategories] = useState([]);
    const {songNav} = useParams();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          title: title,
          artist: artist,
          is_requestable: is_requestable,
          category: category
        };
        const url = `${process.env.REACT_APP_DJANGO_SERVICE}/api/songs/`;
        const fetchConfig = {
          method: 'post',
          body: JSON.stringify(data),
          credentials: 'include',
        };
    
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          navigate('/catalog/');
        }
      };
    
    
}