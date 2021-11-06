import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'My_Team',
    path: '/My_Team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Match',
    path: '/Match',
    icon: <FaIcons.FaClipboardList />,
    cName: 'nav-text'
  },
  {
    title: 'Investigator',
    path: '/Investigator',
    icon: <FaIcons.FaUserSecret />,
    cName: 'nav-text'
  },
  {
    title: 'MC_Provider',
    path: '/MC_Provider',
    icon: <FaIcons.FaClinicMedical />,
    cName: 'nav-text'
  },
  {
    title: 'Stadium',
    path: '/Stadium',
    icon: <FaIcons.FaCity />,
    cName: 'nav-text'
  }
];
