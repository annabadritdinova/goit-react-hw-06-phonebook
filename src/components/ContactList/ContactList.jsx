import PropTypes from 'prop-types';
import IconButton from '../IconButton';
import { connect } from 'react-redux';
import * as phonebookActions from '../../redux/phonebook-actions';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={number.toString()} value={number} className={styles.item}>
          <p className={styles.text}>
            {name}: {number}
          </p>
          <IconButton
            onClick={() => onDeleteContact(id)}
            aria-label="Delete contact"
          >
            <DeleteIcon width="24" height="24" fill="#fff" />
          </IconButton>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

   return allContacts.filter(({ name }) =>
     name.toLowerCase().includes(normalizedFilter),
   );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
   contacts: getVisibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
   onDeleteContact: id => dispatch(phonebookActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);