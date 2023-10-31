import axios from 'axios';

const FetchUserName = async (userId) => {
  try {
    const response = await axios.get(`/user/name/${userId}`);

    if (response.status === 200) {
      const { name } = response.data;
      return name;
    }
  } catch (error) {
    console.error('Error fetching user name:', error);
    return null; 
  }
};

export default FetchUserName;
