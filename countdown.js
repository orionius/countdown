window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    // ����� �������� ���� (�������)
    let deadline = '2019-04-22';

    // ������� �������� �������
    function getTimeRemaining(endtime) {
        // �������� �������. ��������� �������� ���� � ������������ � �������� ������� ����
        let t = Date.parse(endtime) - Date.now(),
            // ����������� �������, ������, ���� � ���
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            days = Math.floor((t / 1000 / 60 / 60 / 24));

        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        };
    }

    // ����������� � ������������� �������� � ��������
    function setClock(id, endtime) {
        // �������� ���� ������� �� ��� id
        let timer = document.getElementById(id),
            // � �������������, ��� �������� �����
            days = timer.querySelector('.days'),
            dayname = timer.querySelector('.dayname'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            // ��������� ������ ������ �������
            timeInterval = setInterval(updateClock, 1000);

        // ������� ��� ���������� �������
        function updateClock() {
            // �������� � t ��������� ������� getTimeRemaining (������)
            let t = getTimeRemaining(endtime);
            // ���� ���� �������� 0 - �� �������
            if (t.days <= 0) {
                days.textContent = "";
                dayname.textContent = "";
            } else {
                days.textContent = t.days;
                // ��������� ����� "����" ��� ���� ���������� (����, ���)
                dayname.textContent = formatDays(t.days);
            }
            // ��������� ���������� �����
            hours.textContent = formatTime(t.hours);
            minutes.textContent = formatTime(t.minutes);
            seconds.textContent = formatTime(t.seconds);

            // ���� ������� ������ - ��������� � ������ 00:00:00,
            // � ������������� ������ (clearInterval)
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = "";
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

        // ������� ��������� 0 � �������, ��������
        // 03:04:05 ������ 3:4:5
        function formatTime(time) {
            if (time < 10) {
                time = '0' + time;
            }
            return time;
        }

        // ����������� ����� ���� � ����������� �� �����
        // 1 ����, 2 ���, 5 ����.
        function formatDays(day) {
            let sb = '',
                dayNew = day % 100,
                lastFigure = dayNew % 10;
            if (dayNew > 10 && dayNew < 20) {
                sb = '��';
            } else if (lastFigure == 1) {
                sb = "����";
            } else if (lastFigure > 1 && lastFigure < 5) {
                sb = '���';
            } else {
                sb = '����';
            }
            return sb;
        }
    }

    //����� �������. ������� id �������� � ��� �������
    setClock('timer', deadline);
});