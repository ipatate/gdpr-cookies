// @flow @jsx h
import {h} from 'preact';
import {useRef, useLayoutEffect} from 'preact/hooks';
import Button from '../Button';
import ListElement from '../ListElement';
import BtActions from '../BtActions';
import Close from './close.svg';
import Arrow from './arrow-left.svg';
import './style.css';

const Modal = ({
  toggleModal,
  listService,
  t,
  saveStateInGdpr,
  showModal,
  toggleAllService,
}: AppProps) => {
  const _header = useRef(null);
  const actionBar = useRef(null);

  const closeAndSave = (e: Event): void => {
    e.preventDefault();
    toggleModal(false);
    saveStateInGdpr();
  };

  const getListElement = (): Array<any> => {
    let type = '';
    return listService.map(service => {
      let r = [];
      if (service.type !== type) {
        r.push(
          <div key={service.type} class="gdpr_modal_list-head">
            <div className="gdpr_modal_list-head-text">
              <Arrow width="24px" height="24px" />
              {t(service.type)}
            </div>
          </div>,
        );
      }
      r.push(<ListElement key={service.name} t={t} service={service} />);
      type = service.type;
      return r;
    });
  };

  // set focus on first btn on mount
  useLayoutEffect(() => {
    if (_header.current && actionBar.current) {
      const closeBtn = _header.current.querySelector('button');
      const lastBtn = actionBar.current.querySelector('button');
      // set Focus to first btn
      closeBtn.focus();
      // listen last btn, on key tab press, focus on first btn
      lastBtn.addEventListener('keydown', e => {
        if (e.code === 'Tab') {
          closeBtn.focus();
          return e.preventDefault();
        }
      });
    }
  }, []);
  if (showModal === false) return null;
  return (
    <div
      role="dialog"
      aria-label={t('modal_header_txt')}
      aria-modal="true"
      className="gdpr_modal"
    >
      <div className="gdpr_modal_content">
        <div className="gdpr_modal_head">
          <div className="gdpr_modal_head-content">
            <header ref={_header}>
              <strong id="gm_modal_title">{t('modal_header_txt')}</strong>
              <Button
                aria-label={t('close_modale_label')}
                className=""
                onClick={closeAndSave}
              >
                <Close width="20px" height="20px" alt="" />
              </Button>
            </header>
          </div>
          <div className="gdpr_modal_button-all">
            <BtActions
              t={t}
              onChange={state => {
                return toggleAllService(state);
              }}
            />
          </div>
        </div>
        <div className="gdpr_modal_list-content">{getListElement()}</div>
        <div ref={actionBar} className="gdpr_modal_action">
          <Button
            aria-label={t('modal_valid')}
            className="gdpr_btn-success"
            onClick={closeAndSave}
          >
            {t('modal_valid')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
