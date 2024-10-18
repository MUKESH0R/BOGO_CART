document.addEventListener('DOMContentLoaded', function() {
    let currentlyOpen = null;

    function toggleSizeColor(element) {
        // Hide the previously opened size_color_container if it exists
        if (currentlyOpen && currentlyOpen !== element) {
            currentlyOpen.querySelector('.size_color_container').style.display = 'none';
            currentlyOpen.style.border = '1px solid #C8C8C8';
            currentlyOpen.classList.remove('selected'); // Remove selected class
        }

        // Toggle the visibility of the size_color_container within the clicked box
        const sizeColorContainer = element.querySelector('.size_color_container');
        const isVisible = sizeColorContainer.style.display === 'block';

        // If the box is currently open, close it and reset the border
        if (currentlyOpen === element && isVisible) {
            sizeColorContainer.style.display = 'none';
            element.style.border = '1px solid #C8C8C8';
            element.classList.remove('selected');
            currentlyOpen = null;
        } else {
            // Otherwise, open the new box and set the border
            sizeColorContainer.style.display = 'block';
            element.style.border = '2px solid #FF6B82';
            element.classList.add('selected');
            currentlyOpen = element;
        }
    }

    // Add click event listeners to all boxes
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', function() {
            toggleSizeColor(this);
        });
    });

    // Prevent click events within .size_color_container from propagating to the parent box
    document.querySelectorAll('.size_color_container').forEach(container => {
        container.addEventListener('click', event => {
            event.stopPropagation();
        });
    });

    function updateTotal() {
        let total = 0;
        const boxes = document.querySelectorAll('.box');

        boxes.forEach(box => {
            const priceText = box.querySelector('.second_container big').innerText;
            const price = parseFloat(priceText.replace('$', ''));
            const radioButton = box.querySelector('input[type="radio"]:checked');
            if (radioButton) {
                total += price;
            }
        });

        document.getElementById('finalTotal').innerText = total.toFixed(2);
    }

    // Add event listeners to radio buttons for updating the total
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', updateTotal);
    });
});
