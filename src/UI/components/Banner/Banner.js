// @flow @jsx h
import {h} from 'preact';
import {useLayoutEffect, useRef} from 'preact/hooks';
import Button from '../Button';
import './style.css';

const Banner = ({
  t,
  toggleModal,
  toggleBanner,
  showBanner,
  saveStateInGdpr,
}: AppProps) => {
  const closeAndSave = (): void => {
    toggleBanner(false);
    toggleModal(false);
    saveStateInGdpr();
  };
  if (showBanner === false) return null;
  const containerBtn = useRef(null);
  // set focus on first btn on mount
  useLayoutEffect(() => {
    if (containerBtn.current) {
      const firstBtn = containerBtn.current.children[0];
      const lastBtn = containerBtn.current.children[1];
      // set Focus to first btn
      firstBtn.focus();
      // listen last btn, on key tab press, focus on first btn
      lastBtn.addEventListener('keydown', e => {
        if (e.code === 'Tab') {
          firstBtn.focus();
          return e.preventDefault();
        }
      });
    }
  }, []);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={t('banner_title')}
      aria-describedby="gdpr_text"
      className="gdpr_banner"
    >
      <div className="gdpr_banner-content" role="document">
        <div id="gdpr_text" className="gdpr_banner-text">
          {t('alert_text')}
        </div>
        <div className="gdpr_banner-actions" ref={containerBtn}>
          <Button
            className="gdpr_btn-success"
            onClick={e => {
              e.preventDefault();
              closeAndSave();
            }}
            aria-label={t('banner_ok_bt')}
          >
            {t('banner_ok_bt')}
          </Button>
          <Button
            className="gdpr_btn-default"
            onClick={e => {
              e.preventDefault();
              toggleModal(true);
              toggleBanner(false);
            }}
            aria-label={t('banner_custom_bt')}
          >
            {t('banner_custom_bt')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
