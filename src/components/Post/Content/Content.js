// @flow strict
import React from 'react';
import Meta from '../Meta';
import styles from './Content.module.scss';

type Props = {
  body: string,
  title: string,
  date: string
};

const Content = ({ body, title, date }: Props) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__body']}>
      <Meta date={date} />
    </div>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
