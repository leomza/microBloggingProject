import React, { Fragment } from 'react'
import TweetsList from './TweetsList'
import AddNewTweet from './AddNewTweet'
import { Route, Switch, Link } from 'react-router-dom'
import ProfileForm from './ProfileForm'
import styles from '../styles/navBar.module.css'

const NavBar = () => {
  return (
    <Fragment>
      <nav className={styles.navBar}>
        <ul className={styles.navBar__list}>
          <li className={styles.navBar__link_content}>
            <Link className={styles.navBar__link} to='/'>
              Home
            </Link>
          </li>
          <li className={styles.navBar__link_content}>
            <Link className={styles.navBar__link} to='/profile'>
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path='/' exact>
          <div>
            <AddNewTweet />
            <TweetsList />
          </div>
        </Route>
        <Route path='/profile'>
          <ProfileForm />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default NavBar
