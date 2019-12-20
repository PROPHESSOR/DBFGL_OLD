import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Input from '#Component/Form/Input';
import IconButton from '#Component/Form/IconButton';
import refreshSvg from '../../assets/icon/refresh.svg';
import { useTranslation } from '#Util/translation';

const ModFilterStyle = styled.div`
  margin-bottom: 5px;
  display: flex;
`;

const ModFilter = ({ onRefresh, onInput, valueInput, refreshLoad }) => {
  const { t } = useTranslation('wads');
  return (
    <ModFilterStyle>
      <Input
        onChange={onInput}
        value={valueInput}
        placeholder={t('filter')}
        fluid
      />
      <IconButton svg={refreshSvg} onClick={onRefresh} load={refreshLoad} />
    </ModFilterStyle>
  );
};

ModFilter.propTypes = {
  onInput: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  refreshLoad: PropTypes.bool.isRequired,
  valueInput: PropTypes.string
};

export default ModFilter;
