import classes from './LearnPlace.module.css';
import { useLocation } from 'react-router-dom';

function LearnPlace(props) {
  const user = props.userData;
  console.log(user);
  
  return (
    <div>
        <h1>MyLearnplace</h1>
        <span>{user.data.user.name}</span>
    </div>
  );
}

export default LearnPlace;
