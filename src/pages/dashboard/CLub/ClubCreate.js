import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { getClubList } from 'src/redux/slices/club';
import ClubNewForm from 'src/components/_dashboard/club/ClubNewForm';

// ----------------------------------------------------------------------

export default function ClubCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { clubList } = useSelector((state) => state.club);
  const isEdit = pathname.includes('edit');
  const currentClub = clubList.find((club) => club.id === Number(id));

  useEffect(() => {
    dispatch(getClubList());
  }, [dispatch]);

  return (
    <Page title="Club: Create a new club | V League">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new club' : 'Edit club'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Club', href: PATH_DASHBOARD.club.root },
            { name: !isEdit ? 'New club' : currentClub?.name }
          ]}
        />

        <ClubNewForm isEdit={isEdit} currentClub={currentClub} />
      </Container>
    </Page>
  );
}
