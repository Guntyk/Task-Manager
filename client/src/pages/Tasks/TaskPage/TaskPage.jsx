import cn from 'classnames';
import { Priority } from 'components/Priority';
import { statuses } from 'constants/statuses';
import { calculateCompletionPercentage } from 'helpers/calculateCompletionPercentage';
import { formatTimestamp } from 'helpers/formatTimestamp';
import styles from 'pages/Tasks/TaskPage/TaskPage.scss';

export const TaskPage = () => {
  const creationDate = '2024-01-20T00:00:00';
  const deadlineDate = '2025-05-30T00:00:00';
  const currentDate = new Date();

  const progress = calculateCompletionPercentage(creationDate, deadlineDate);

  return (
    <section>
      <div className={styles.timeline}>
        <div className={styles.timelineStart}>{formatTimestamp(creationDate)}</div>
        <div className={styles.timelineWrapper}>
          <div className={styles.timelineProgress} style={{ width: `${progress}%` }}>
            <span className={styles.timelineCurrentDate}>{formatTimestamp(currentDate)}</span>
          </div>
        </div>
        <div className={styles.timelineEnd}>{formatTimestamp(deadlineDate)}</div>
      </div>
      <h1 className={styles.title}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus, velit?</h1>
      <div className={styles.additionInformation}>
        <span
          className={styles.status}
          style={{ background: statuses.find(({ name }) => name === 'in progress').color }}
        >
          In progress
        </span>
        <Priority number={10} big />
      </div>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nisi iste, dolorum ea iure voluptas!{' '}
        <code className={cn(styles.code, styles.codeBlock)}>const currentDate = new Date();</code> Officia quam,
        perferendis nobis blanditiis temporibus doloremque nulla ullam natus repellat amet nihil excepturi omnis non ad,
        maiores quaerat optio. Voluptate, delectus commodi aliquid magnam sint temporibus corrupti aspernatur, non harum
        nemo dolore sunt minima veritatis facilis nihil, dolores perferendis odio expedita ipsum error facere blanditiis
        dicta deserunt? Officiis, earum? Quod iusto nostrum repellendus delectus ducimus, fuga fugit deserunt quis
        reprehenderit labore accusantium placeat voluptatibus explicabo quidem pariatur sit nulla nemo enim suscipit
        sequi obcaecati! Distinctio fugiat, reprehenderit quibusdam itaque ipsa tenetur facere saepe excepturi autem in
        quod iste fuga! Modi, porro molestias? Nemo quidem deleniti error aperiam eligendi quas sapiente quos voluptatem
        numquam praesentium accusantium delectus veniam ratione doloribus iure aut beatae, ut totam omnis id sequi earum
        expedita recusandae optio! Tenetur cum in, quae similique modi est accusantium ratione hic impedit deserunt
        veniam rem odio. Ipsam consequatur voluptatem voluptatibus. Mollitia omnis ullam odio debitis, veniam porro
        repellat ut blanditiis vero autem corrupti fuga.{' '}
        <code className={styles.code}>const currentDate = new Date();</code> Magnam rerum excepturi non id, perspiciatis
        dolore quia laudantium et tenetur ut fugit vero expedita distinctio ratione tempora quae ducimus illo
        dignissimos architecto. Possimus voluptatum beatae error animi voluptatem, tempore dignissimos quos repudiandae
        sequi eaque iure quidem nulla aliquam officia blanditiis magnam velit eius odit placeat quia commodi vel
        mollitia! Reprehenderit ratione, alias nesciunt ullam corrupti voluptas laudantium est voluptates maiores totam
        assumenda ipsum, recusandae quia incidunt natus accusamus optio! Iste, saepe? Non nemo hic neque perspiciatis
        ipsam cupiditate illo tempora quas mollitia dolorem omnis est quis in inventore numquam libero, obcaecati quam
        sint recusandae dicta saepe nostrum voluptatem architecto. Voluptas perspiciatis iusto nostrum, cumque quasi
        illo tempora adipisci nulla. Distinctio eos vitae dolorem molestiae eius maiores tenetur cum iusto rerum
        veritatis, modi odio blanditiis quos voluptatem sed animi et.
      </p>
    </section>
  );
};
