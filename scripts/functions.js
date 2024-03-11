function setSites(sites) {
    let block = document.querySelector('.list-sites');
    sites.forEach(site => {
        let link = document.createElement('a');
        link.href = "/site_detail.php?id=" + site.id;
        link.classList.add("btn", "btn-primary");
        link.innerHTML = "More";

        let container = document.createElement('li');
        container.classList.add('list-group-item');

        let name = document.createElement('h5');
        name.classList.add('card-title');
        name.innerHTML = site.name;
        
        let url = document.createElement('h6')
        url.classList.add('card-subtitle', 'mb-2', 'text-body-secondary')
        url.innerHTML = site.url

        let description = document.createElement('p');
        description.classList.add('card-text');
        description.innerHTML = site.description;

        container.appendChild(name);
        container.appendChild(url);
        container.appendChild(description);
        container.appendChild(link);

        block.appendChild(container);
    });
}

export {setSites as default}