import { SettingsIcon } from '@chakra-ui/icons';
import { DefaultBtn } from 'components/elements';

const Settings = () => {
  return (
    <DefaultBtn buttonStyles={{ width: '30px', background: 'rgba(0,0,0,0)' }}>
      <SettingsIcon
        width={'25px'}
        height={'25px'}
        cursor={'pointer'}
        transition={'300ms linear all'}
        transform={'rotate(0deg)'}
        _hover={{
          transform: 'rotate(180deg)',
        }}
      />
    </DefaultBtn>
  );
};

export default Settings;
