# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "proxy.box"

  config.vm.network "forwarded_port", guest: 8080, host: 8080

  config.vm.network "private_network", ip: "192.168.32.3"

  config.vm.provider "virtualbox" do |vb|
    vb.customize [
      "modifyvm", :id,
      "--cpuexecutioncap", "50",
      "--memory", "256",
    ]
    # Display the VirtualBox GUI when booting the machine
    vb.gui = true
 
    # Customize the amount of memory on the VM:
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
     apt-get update
     apt-get install -y apache2

     if ! [ -L /var/www ]; then
        rm -rf /var/www
        ln -fs /vagrant/www /var/www
     fi

     cp /vagrant/001-reverse-proxy.conf /etc/apache2/sites-available/
     a2ensite 001-reverse-proxy.conf
#     cp /vagrant/002-forward-proxy.conf /etc/apache2/sites-available/
#     a2ensite 002-forward-proxy.conf
     a2enmod proxy
     a2enmod proxy_http
#     a2enmod disk_cache
     service apache2 restart

  SHELL

end
